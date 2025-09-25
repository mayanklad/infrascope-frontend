import { useEffect, useState, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { getTerraformGraph } from '~/api/terraformApi'

export default function TerraformGraph({ file, width, height }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fgRef = useRef()

  // Transform API response to ForceGraph format
  const transformGraphData = (data) => {
    if (!data) return { nodes: [], links: [] }

    const nodes = data.nodes.map((n) => ({
      id: n.id,
      type: n.type,
      label: n.label,
      metaData: n.metaData || {}
    }))

    const links = data.edges.map((e) => ({
      source: e.from,
      target: e.to,
      relation: e.relation
    }))

    return { nodes, links }
  }

  // Fetch and process graph data
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        setLoading(true)
        const data = await getTerraformGraph(file)
        setGraphData(transformGraphData(data))
        setError(null)
      } catch (err) {
        console.error('Error fetching Terraform graph:', err)
        setError('Failed to load graph.')
      } finally {
        setLoading(false)
      }
    }

    fetchGraph()
  }, [file])

  // Custom node tooltip (on hover)
  const nodeTooltip = (node) => {
    let tooltip = `${node.label} (${node.type})`
    if (node.metaData && Object.keys(node.metaData).length > 0) {
      tooltip += '\n\nMetadata:\n'
      tooltip += Object.entries(node.metaData)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    }
    return tooltip
  }

  // Custom canvas rendering
  const drawNode = (node, ctx, globalScale) => {
    const label = node.label || ''
    const fontSize = 2
    const radius = 4

    // Draw node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = node.color
    ctx.fill()

    // Draw node border
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'
    ctx.stroke()

    // Draw node label
    ctx.font = `${fontSize}px Sans-Serif`
    ctx.fillStyle = 'white'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, node.x + radius + 4, node.y)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white">
        <div className="text-center animate-pulse">
          <p className="text-lg font-semibold">Loading Terraform Graph...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full text-red-500">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      width={width}
      height={height}
      nodeLabel={nodeTooltip}
      nodeAutoColorBy="type"
      linkDirectionalArrowLength={4}
      linkDirectionalArrowRelPos={1}
      linkDirectionalParticles={1}
      linkDirectionalParticleSpeed={0.005}
      linkAutoColorBy="relation"
      linkLabel="relation"
      onNodeClick={(node) => {
        console.log('Node clicked:', node)
      }}
      nodeCanvasObject={drawNode}
    />
  )
}

// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useSearchParams } from 'react-router-dom'
// import TerraformGraph from '~/components/graph/TerraformGraph'
// import AnsibleGraph from '~/components/graph/AnsibleGraph'
// import DockerComposeGraph from '~/components/graph/DockerComposeGraph'

// export default function GraphPage() {
//   const [searchParams] = useSearchParams()
//   const type = searchParams.get('type')
//   const location = useLocation()
//   const file = location.state?.file

//   const graphContainerRef = useRef(null)
//   const [canvasDim, setCanvasDim] = useState({ width: 0, height: 0 })

//   // Handle responsive graph canvas sizing
//   useEffect(() => {
//     const updateSize = () => {
//       if (graphContainerRef.current) {
//         // Use getBoundingClientRect to account for padding
//         const rect = graphContainerRef.current.getBoundingClientRect()
//         setCanvasDim({ width: rect.width, height: rect.height })
//       }
//     }

//     updateSize() // initial sizing

//     const resizeObserver = new ResizeObserver(() => {
//       updateSize()
//     })

//     if (graphContainerRef.current) {
//       resizeObserver.observe(graphContainerRef.current)
//     }

//     return () => {
//       resizeObserver.disconnect()
//     }
//   }, [])

//   if (!file) {
//     return (
//       <div className="grow flex items-center justify-center">
//         <p className="p-20 text-xl font-bold text-white shadow-xl rounded-2xl bg-white/10 backdrop-blur-lg">No file uploaded ❌</p>
//       </div>
//     )
//   }

//   return (
//     <div className="grow flex flex-col items-center">
//       {/* Header */}
//       <header className="flex justify-between items-center w-full py-4 px-6 bg-white/10 backdrop-blur-lg shadow-md text-white">
//         <a href="/">
//           <h1 className="text-2xl font-bold">InfraScope</h1>
//         </a>
//         <p>{type === "terraform" ? "Terraform" : type === "ansible" ? "Ansible" : type === "docker" ? "Docker Compose" : "Graph"} Visualization</p>
//       </header>
      
//       {/* Graph container */}
//       <div
//         ref={graphContainerRef}
//         className="flex items-center justify-center m-auto w-3/4 h-3/4 shadow-xl rounded-2xl bg-white/80 backdrop-blur-lg"
//       >
//         {type === 'terraform' ? (
//           <TerraformGraph file={file} width={canvasDim.width} height={canvasDim.height} />
//         ) : type === 'ansible' ? (
//           <AnsibleGraph file={file} width={canvasDim.width} height={canvasDim.height} />
//         ) : type === 'docker' ? (
//           <DockerComposeGraph file={file} width={canvasDim.width} height={canvasDim.height} />
//         ) : (
//           <p>Unsupported file type ⚠️</p>
//         )}
//       </div>
//     </div>
//   )
// }


import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import TerraformGraph from '~/components/graph/TerraformGraph'
import AnsibleGraph from '~/components/graph/AnsibleGraph'
import DockerComposeGraph from '~/components/graph/DockerComposeGraph'
import { ArrowLeft } from 'lucide-react'

export default function GraphPage() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const location = useLocation()
  const navigate = useNavigate()
  const file = location.state?.file

  const graphContainerRef = useRef(null)
  const [canvasDim, setCanvasDim] = useState({ width: 0, height: 0 })

  // Responsive canvas size based on container
  useEffect(() => {
    const updateSize = () => {
      if (graphContainerRef.current) {
        const rect = graphContainerRef.current.getBoundingClientRect()
        setCanvasDim({ width: rect.width, height: rect.height })
      }
    }

    updateSize()

    const resizeObserver = new ResizeObserver(() => updateSize())

    if (graphContainerRef.current) {
      resizeObserver.observe(graphContainerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const getTitle = () => {
    switch (type) {
      case 'terraform':
        return 'Terraform'
      case 'ansible':
        return 'Ansible'
      case 'docker':
        return 'Docker Compose'
      default:
        return 'Graph'
    }
  }

  if (!file) {
    return (
      <div className="grow flex items-center justify-center text-white px-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-2xl text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-4">No File Uploaded ❌</h2>
          <p className="mb-6 text-white/80">You need to upload a file before visualizing.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grow flex flex-col w-full bg-gradient-to-b from-gray-900 via-slate-900 to-gray-950 text-white">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 py-4 bg-white/5 backdrop-blur border-b border-white/10 shadow-sm">
        <a href="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition">
          InfraScope
        </a>
        <p className="text-sm sm:text-base text-white/70 font-medium">
          {getTitle()} Visualization
        </p>
      </header>

      {/* Graph container */}
      <main className="grow flex items-center justify-center px-6 py-10">
        <div
          ref={graphContainerRef}
          className="w-full max-w-6xl h-9/10 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl p-4 md:p-6 border border-white/20 flex items-center justify-center"
        >
          {type === 'terraform' ? (
            <TerraformGraph file={file} width={canvasDim.width} height={canvasDim.height} />
          ) : type === 'ansible' ? (
            <AnsibleGraph file={file} width={canvasDim.width} height={canvasDim.height} />
          ) : type === 'docker' ? (
            <DockerComposeGraph file={file} width={canvasDim.width} height={canvasDim.height} />
          ) : (
            <p className="text-lg font-medium text-white">Unsupported file type ⚠️</p>
          )}
        </div>
      </main>
    </div>
  )
}

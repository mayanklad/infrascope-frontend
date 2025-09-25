import { useState } from 'react'
import { Upload, File } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [file, setFile] = useState(null)
  const [fileType, setFileType] = useState('terraform') // 'terraform', 'ansible', 'docker'
  const [isDragging, setIsDragging] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleVisualize = () => {
    navigate(`/graph?type=${fileType}`, { state: { file } })
  }

  return (
    <div className="grow flex flex-col items-center justify-center text-white px-4 py-12">
      <div className="w-full max-w-3xl flex flex-col items-center p-8 md:p-12 shadow-2xl rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20">

        {/* Title and subtitle */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl">InfraScope</h1>
          <p className="mt-4 text-lg md:text-2xl font-light text-white/80">
            Visualize and Simulate Your Infrastructure as Code 🚀
          </p>
        </div>

        {/* File type selector */}
        <div className="mt-8 w-full">
          <h2 className="text-center text-sm font-semibold text-white/80 mb-2">Choose File Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: 'terraform', label: 'Terraform' },
              { value: 'ansible', label: 'Ansible' },
              { value: 'docker', label: 'Docker Compose' },
            ].map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center justify-center px-4 py-3 rounded-xl cursor-pointer transition-all
                  border-2 text-white font-medium text-center
                  ${fileType === value
                    ? 'bg-indigo-600 border-indigo-600 shadow-md'
                    : 'bg-white/10 border-white/20 hover:border-indigo-400 hover:bg-white/20'
                  }
                `}
              >
                <input
                  type="radio"
                  name="fileType"
                  value={value}
                  checked={fileType === value}
                  onChange={(e) => {
                    setFile(null)
                    setFileType(e.target.value)
                  }}
                  className="hidden"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* File upload area */}
        <div
          className={`mt-10 w-full transition-all rounded-2xl border-2 border-dashed p-8 text-gray-800 text-center
            ${isDragging ? 'border-indigo-500 bg-indigo-100' : file ? 'border-gray-300 bg-white' : 'border-white/30 bg-white/10'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <Upload className="w-10 h-10 text-indigo-600" />
            <p className="text-gray-700 font-medium">
              Drag & drop your <span className="capitalize">{fileType === 'docker' ? 'Docker Compose' : fileType}</span> file here
            </p>
            <p className="text-sm text-gray-500">or</p>
            <label
              htmlFor="file-upload"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 cursor-pointer transition"
            >
              Choose File
            </label>

            {/* Choose file button */}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Selected file name display */}
            {file && (
              <div className="flex items-center gap-2 text-sm text-gray-800 bg-white px-4 py-2 rounded-md shadow mt-2">
                <File className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{file.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Visualize button */}
        <button
          disabled={!file}
          onClick={handleVisualize}
          className={`mt-8 px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200
            ${
              file
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }
          `}
        >
          Visualize
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function Homepage() {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

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

  return (
    <div className="grow flex flex-col items-center justify-center text-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          InfraScope
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light">
          Visualize and Simulate Your Infrastructure as Code 🚀
        </p>
      </div>

      {/* File upload area */}
      <div
        className={`mt-10 text-gray-800 rounded-2xl shadow-xl p-6 md:p-10 w-11/12 md:w-2/3 lg:w-1/2 
          border-2 border-dashed transition ${
            isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-white'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-12 h-12 text-indigo-600" />
          <p className="text-center text-gray-600">
            Drag & drop your Terraform, Ansible, or Docker Compose files here
          </p>
          <p className="text-sm text-gray-500">or</p>

          {/* File input */}
          <label
            for="file-upload"
            className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Selected file label */}
          {file && (
            <p className="text-sm text-gray-700">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
          )}

          {/* Visualize button */}
          <button
            disabled={!file}
            className={`mt-4 px-6 py-3 rounded-xl font-semibold shadow-md transition 
              ${file ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            Visualize
          </button>
        </div>
      </div>
    </div>
  )
}

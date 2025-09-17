import AppRoutes from '~/routes/AppRoutes.jsx'

export default function App() {
  return (
    <div
      className="h-dvh flex flex-col bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600"
    >
      <AppRoutes />

      {/* Footer */}
      <footer className="h-fit p-4 bg-black/20 text-center text-sm text-white font-light">
        Made with ❤️ by Mayank Lad
        <br />
        &copy; {new Date().getFullYear()} InfraScope. All rights reserved.
      </footer>
    </div>
  )
}

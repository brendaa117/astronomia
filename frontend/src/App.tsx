import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Loading from './components/Loading.tsx'

const AdminPage = lazy(() => import('./pages/AdminPage.tsx'))
const ObjectListPage = lazy(() => import('./pages/ObjectListPage.tsx'))
const ObjectDetailPage = lazy(() => import('./pages/ObjectDetailPage.tsx'))
const ObjectCreatePage = lazy(() => import('./pages/ObjectCreatePage.tsx'))
const ObjectEditPage = lazy(() => import('./pages/ObjectEditPage.tsx'))

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<ObjectListPage />} />
            <Route path="/objects" element={<ObjectListPage />} />
            <Route path="/objects/new" element={<ObjectCreatePage />} />
            <Route path="/objects/:id" element={<ObjectDetailPage />} />
            <Route path="/objects/:id/edit" element={<ObjectEditPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App

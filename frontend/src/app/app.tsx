import Layout from "@modules/components/layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "."

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} index/>
                <Route path="/scanner" element={<Layout><></></Layout>}/>
                <Route path="/home" element={<Layout><></></Layout>}/>
                <Route path="/profile" element={<Layout><></></Layout>}/>
                <Route path="/a/signout" element={<Layout><></></Layout>}/>
                <Route path="/a/signin" element={<Layout><></></Layout>}/>
                <Route path="/a/signup" element={<Layout><></></Layout>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

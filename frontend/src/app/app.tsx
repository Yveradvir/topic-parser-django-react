import Layout from "@modules/components/layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./auth/signup"
import SignIn from "./auth/signin"
import Scanner from "./scanner"
import Index from "."
import HomePage from './homepage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} index/>
                <Route path="/scanner" element={<Scanner/>}/>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/profile" element={<Layout><></></Layout>}/>
                <Route path="/a/signout" element={<Layout><></></Layout>}/>
                <Route path="/a/signin" element={<SignIn />}/>
                <Route path="/a/signup" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

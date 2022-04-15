import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import CustomerAdd from './pages/CustomerAdd';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <CustomerAdd />} />
            </Routes>
        </Router>
    )
}
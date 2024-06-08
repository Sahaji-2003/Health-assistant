import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AllMachinesDetails from './AllMachinesDetails';

function IndexMachines() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    useEffect(() => {
        // Function to handle sidebar visibility based on viewport width
        const handleViewportChange = () => {
            const isMobile = window.matchMedia('(max-width: 991.98px)').matches; // Mobile devices width (Bootstrap's default)
            setIsSidebarOpen(!isMobile); // Set the initial state of the sidebar based on viewport width
        };
        // Call the function initially to set the initial state
        handleViewportChange();
        // Add event listener for window resize
        window.addEventListener('resize', handleViewportChange);
        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleViewportChange);
        };
    }, []);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="app-container">
            <Header toggleSidebar={toggleSidebar} />
            <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
                <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
                <main id="main" className='main'>

                    <section className="section dashboard">

                        <div className="container-fluid">
                            <h4 className="card-title text-center">Create New User</h4>
                            <div className="row">
                                <div>
                                    {/* <UsersTable /> */}
                                    {/* <CreateUser /> */}
                                    <AllMachinesDetails/>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            </div>
        
    )
}

export default IndexMachines;
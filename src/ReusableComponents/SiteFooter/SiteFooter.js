import React from "react"

import "./SiteFooter.scss"

function SiteFooter() {
    return (
        <div className="site_footer">
            <div>
                <p>Contact Us</p>
            </div>
            <div className="contact_info_container">
                <p>Email: skillbrushup@somesite.com</p>
                <p>Phone: 801-123-4567</p>
            </div>
        </div>
    )
}

export default SiteFooter
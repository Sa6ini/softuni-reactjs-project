import TeamMember from "./TeamMember"
import React from "react"
export default function Team() {
    return (
        <>
            <div className="container-fluid p-5">
                <div className="mb-5 text-center">
                    <h5 className="text-primary text-uppercase">The Team</h5>
                    <h1 className="display-3 text-uppercase mb-0">Expert Trainers</h1>
                </div>
                <div className="row g-5">
                    <TeamMember
                        image="img/team-1.jpg"
                        name="John Deo"
                        title="Trainer"
                        socialLinks={[
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-twitter' },
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-facebook-f' },
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-linkedin-in' },
                        ]}
                    />
                    <TeamMember
                        image="img/team-2.jpg"
                        name="James Taylor"
                        title="Trainer"
                        socialLinks={[
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-twitter' },
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-facebook-f' },
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-linkedin-in' },
                        ]}
                    />

                    <TeamMember
                        image="img/team-3.jpg"
                        name="Adam Phillips"
                        title="Trainer"
                        socialLinks={[
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-twitter' },
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-facebook-f' },
                            { href: 'https://youtu.be/S6UqgjaBt4w?si=VFZBwgRPbhxKJl2f', icon: 'fab fa-linkedin-in' },
                        ]}
                    />

                </div >
            </div >
        </>
    )
}
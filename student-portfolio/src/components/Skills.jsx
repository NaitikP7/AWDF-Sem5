import React from 'react'

const Skills = ({ skills = [] }) => {
  return (
    <section className='skills-section'>
      <span className='section-number'>02 / TOOLKIT</span>
      <h2>Tools I work with</h2>
      <ul className='skill-list'>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
    </section>
  )
}

export default Skills

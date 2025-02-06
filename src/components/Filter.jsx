import React from 'react'

function Filter() {
  return (
    <div className="sidebar">
      <div className="filters">
        <h3>Filters</h3>
        <label><input type="checkbox" defaultChecked /> Everything</label>
        <label><input type="checkbox" /> Movies I Haven't Seen</label>
        <label><input type="checkbox" /> Movies I Have Seen</label>

        <h3>Genres</h3>
        <label><input type="checkbox" /> Action</label>
        <label><input type="checkbox" /> Adventure</label>
        <label><input type="checkbox" /> Comedy</label>
        <label><input type="checkbox" /> Animation</label>
        <label><input type="checkbox" /> Mystery</label>
        <label><input type="checkbox" /> Horror</label>
        <label><input type="checkbox" /> Fantasy</label>
        <label><input type="checkbox" /> Romance</label>
        <label><input type="checkbox" /> Drama</label>
        <label><input type="checkbox" /> History</label>
        <label><input type="checkbox" /> Music</label>
        <label><input type="checkbox" /> Thriller</label>
        <label><input type="checkbox" /> Family</label>

        <h3>Certification</h3>
        <label><input type="checkbox" /> G</label>
        <label><input type="checkbox" /> PG</label>
        <label><input type="checkbox" /> PG-13</label>
        <label><input type="checkbox" /> R</label>
        <label><input type="checkbox" /> NR</label>
      </div>
    </div>
  )
}

export default Filter
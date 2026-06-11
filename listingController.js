const db = require('../config/db');

exports.getAllListings = async (req, res) => {
  try {
    const { area, minPrice, maxPrice, verifiedOnly } = req.query;
    let query = `
      SELECT l.*, u.full_name as agent_name, u.phone as agent_phone 
      FROM listings l 
      JOIN users u ON l.agent_id = u.id 
      WHERE 1=1
    `;
    const params = [];

    if (area && area !== 'all') {
      params.push(area);
      query += ` AND l.area = $${params.length}`;
    }
    if (maxPrice) {
      params.push(maxPrice);
      query += ` AND l.price <= $${params.length}`;
    }
    if (verifiedOnly === 'true') {
      query += ` AND l.status = 'verified'`;
    }

    query += ` ORDER BY l.created_at DESC`;
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

exports.createListing = async (req, res) => {
  const { title, description, price, area, distance, amenities, photos, gps_lat, gps_lng } = req.body;
  const agent_id = req.user.id;
  try {
    const result = await db.query(
      `INSERT INTO listings (agent_id, title, description, price, area, distance, amenities, photos, gps_lat, gps_lng) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [agent_id, title, description, price, area, distance, JSON.stringify(amenities), JSON.stringify(photos), gps_lat, gps_lng]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT l.*, u.full_name as agent_name, u.phone as agent_phone 
       FROM listings l 
       JOIN users u ON l.agent_id = u.id 
       WHERE l.id = $1`, 
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Listing not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};

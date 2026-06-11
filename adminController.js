const db = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    const usersCount = await db.query('SELECT COUNT(*) FROM users');
    const listingsCount = await db.query('SELECT COUNT(*) FROM listings');
    const pendingVerifications = await db.query("SELECT COUNT(*) FROM agent_verifications WHERE status = 'pending'");
    
    res.json({
      totalUsers: parseInt(usersCount.rows[0].count),
      totalListings: parseInt(listingsCount.rows[0].count),
      pendingVerifications: parseInt(pendingVerifications.rows[0].count)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.updateListingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE listings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing status' });
  }
};

exports.getAgentVerifications = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT av.*, u.full_name, u.email, u.phone 
       FROM agent_verifications av 
       JOIN users u ON av.user_id = u.id 
       ORDER BY av.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch verifications' });
  }
};

function AboutUs({ onNavigate }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Paradise Nursery</h1>
      <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
        Paradise Nursery was founded with a simple mission: to bring the beauty and
        tranquility of nature into every home. We believe that houseplants not only
        beautify living spaces but also improve air quality and mental well-being.
      </p>
      <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
        Our curated collection includes aromatic herbs, medicinal plants, air-purifying
        species, succulents, and flowering plants — carefully selected to thrive indoors.
      </p>
      <button onClick={() => onNavigate('products')} style={{
        marginTop: '2rem', padding: '0.75rem 2rem',
        background: '#4caf50', color: 'white', border: 'none',
        borderRadius: '25px', cursor: 'pointer', fontSize: '1rem'
      }}>
        Shop Now
      </button>
    </div>
  );
}

export default AboutUs;
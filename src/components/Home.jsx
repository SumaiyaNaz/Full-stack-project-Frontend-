// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
// import { useAuth } from '../context/AuthContext';

// const flowers = [
//   {
//     id: 1,
//     name: 'Red Rose',
//     scientificName: 'Rosa',
//     color: 'Red',
//     meaning: 'Love & Romance',
//     image: 'https://cdn.pixabay.com/photo/2018/05/07/18/31/rose-3381398_640.jpg',
//     description: 'The classic symbol of love and passion. Red roses express deep emotions and romantic feelings.'
//   },
//   {
//     id: 2,
//     name: 'Sunflower',
//     scientificName: 'Helianthus annuus',
//     color: 'Golden Yellow',
//     meaning: 'Happiness & Loyalty',
//     image: 'https://cdn.pixabay.com/photo/2018/06/25/17/11/sunflower-3497443_640.jpg',
//     description: 'Sunflowers follow the sun and represent joy, positivity, and long-lasting loyalty.'
//   },
//   {
//     id: 3,
//     name: 'Lavender',
//     scientificName: 'Lavandula',
//     color: 'Purple',
//     meaning: 'Calm & Serenity',
//     image: 'https://cdn.pixabay.com/photo/2016/07/10/21/40/lavender-1508387_640.jpg',
//     description: 'Known for its soothing scent, lavender brings peace, relaxation, and tranquility.'
//   },
//   {
//     id: 4,
//     name: 'Pink Tulip',
//     scientificName: 'Tulipa',
//     color: 'Pink',
//     meaning: 'Caring & Affection',
//     image: 'https://cdn.pixabay.com/photo/2016/11/08/10/55/tulips-1807850_640.jpg',
//     description: 'Pink tulips symbolize caring, good wishes, and attachment to someone special.'
//   },
//   {
//     id: 5,
//     name: 'White Lily',
//     scientificName: 'Lilium',
//     color: 'White',
//     meaning: 'Purity & Elegance',
//     image: 'https://cdn.pixabay.com/photo/2015/05/07/14/31/lily-756595_640.jpg',
//     description: 'White lilies represent purity, rebirth, and majestic beauty.'
//   },
//   {
//     id: 6,
//     name: 'Orchid',
//     scientificName: 'Orchidaceae',
//     color: 'Purple',
//     meaning: 'Beauty & Strength',
//     image: 'https://cdn.pixabay.com/photo/2017/09/14/12/30/orchid-2749045_640.jpg',
//     description: 'Exotic orchids symbolize rare beauty, strength, and luxury.'
//   },
//   {
//     id: 7,
//     name: 'Daisy',
//     scientificName: 'Bellis perennis',
//     color: 'White',
//     meaning: 'Joy & Friendship',
//     image: 'https://cdn.pixabay.com/photo/2017/07/03/20/17/daisies-2468868_640.jpg',
//     description: 'Daisies symbolize innocence, purity, and bring joy to any setting.'
//   },
//   {
//     id: 8,
//     name: 'Lotus',
//     scientificName: 'Nelumbo nucifera',
//     color: 'Pink',
//     meaning: 'Spiritual Growth',
//     image: 'https://cdn.pixabay.com/photo/2016/04/02/16/25/lotus-1302847_640.jpg',
//     description: 'The sacred lotus represents spiritual awakening and purity of heart.'
//   },
//   {
//     id: 9,
//     name: 'Hyacinth',
//     scientificName: 'Hyacinthus',
//     color: 'Purple',
//     meaning: 'Sorrow & Forgiveness',
//     image: 'https://cdn.pixabay.com/photo/2020/03/13/15/14/hyacinth-4927816_640.jpg',
//     description: 'Hyacinths symbolize sincerity and represent deep emotions.'
//   },
//   {
//     id: 10,
//     name: 'Cherry Blossom',
//     scientificName: 'Prunus serrulata',
//     color: 'Pink',
//     meaning: 'Renewal & Beauty',
//     image: 'https://cdn.pixabay.com/photo/2016/01/21/16/17/cherry-blossom-1153425_640.jpg',
//     description: 'Cherry blossoms symbolize the fleeting nature of life and beautiful beginnings.'
//   },
//   {
//     id: 11,
//     name: 'Daffodil',
//     scientificName: 'Narcissus',
//     color: 'Yellow',
//     meaning: 'New Beginnings',
//     image: 'https://cdn.pixabay.com/photo/2017/01/17/15/13/daffodil-1986845_640.jpg',
//     description: 'Daffodils represent rebirth, new beginnings, and hope for the future.'
//   },
//   {
//     id: 12,
//     name: 'Marigold',
//     scientificName: 'Tagetes',
//     color: 'Orange',
//     meaning: 'Passion & Creativity',
//     image: 'https://cdn.pixabay.com/photo/2018/05/06/10/52/marigold-3379071_640.jpg',
//     description: 'Marigolds symbolize warm emotions, creativity, and positive energy.'
//   }
// ];

// const Home = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [loadedImages, setLoadedImages] = useState({});

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <Spinner animation="border" variant="success" />
//         <span className="ms-3">Loading beautiful flowers...</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Hero Section */}
//       <div style={{
//         background: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
//         padding: '80px 20px',
//         color: 'white',
//         textAlign: 'center'
//       }}>
//         <Container>
//           <h1 className="display-4 fw-bold mb-3">
//             🌸 Welcome to Flower Paradise {user?.name?.split(' ')[0] || 'Friend'}! 🌸
//           </h1>
//           <p className="lead">
//             Discover the beauty, meaning, and magic of flowers from around the world
//           </p>
//         </Container>
//       </div>

//       {/* Flowers Gallery */}
//       <Container className="py-5">
//         <h2 className="text-center mb-5" style={{ color: '#2d6a4f', fontSize: '2.5rem' }}>
//           Our Beautiful Flower Collection
//         </h2>
//         <Row className="g-4">
//           {flowers.map((flower) => (
//             <Col key={flower.id} xs={12} sm={6} md={6} lg={4} xl={3}>
//               <Card className="h-100 shadow-sm border-0" style={{
//                 borderRadius: '15px',
//                 overflow: 'hidden',
//                 transition: 'transform 0.3s ease',
//                 cursor: 'pointer'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
//                 <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
//                   <Card.Img 
//                     variant="top" 
//                     src={flower.image} 
//                     style={{ 
//                       height: '100%',
//                       width: '100%',
//                       objectFit: 'cover',
//                       opacity: loadedImages[flower.id] ? 1 : 0,
//                       transition: 'opacity 0.5s ease'
//                     }}
//                     onLoad={() => setLoadedImages(prev => ({ ...prev, [flower.id]: true }))}
//                   />
//                   {!loadedImages[flower.id] && (
//                     <div className="d-flex justify-content-center align-items-center h-100">
//                       <Spinner animation="border" variant="success" />
//                     </div>
//                   )}
//                 </div>
//                 <Card.Body>
//                   <Card.Title className="h3 mb-2" style={{ color: '#2d6a4f' }}>
//                     {flower.name}
//                   </Card.Title>
//                   <Card.Subtitle className="mb-2 text-muted">
//                     {flower.scientificName}
//                   </Card.Subtitle>
//                   <div className="mb-2">
//                     <span className="badge bg-success me-2">🌸 {flower.color}</span>
//                     <span className="badge bg-info text-white">💖 {flower.meaning}</span>
//                   </div>
//                   <Card.Text className="text-muted">
//                     {flower.description}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Fun Facts Section */}
//       <div style={{ background: '#2d6a4f', padding: '60px 0' }}>
//         <Container>
//           <h2 className="text-center text-white mb-5">🌼 Amazing Flower Facts 🌼</h2>
//           <Row className="g-4">
//             <Col xs={12} sm={6} lg={3}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: '15px',
//                 padding: '20px',
//                 textAlign: 'center',
//                 transition: 'transform 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
//                 <div style={{ fontSize: '3rem' }}>🌻</div>
//                 <h4>Oldest Flower</h4>
//                 <p>Montsechia vidalii lived 130 million years ago!</p>
//               </div>
//             </Col>
//             <Col xs={12} sm={6} lg={3}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: '15px',
//                 padding: '20px',
//                 textAlign: 'center',
//                 transition: 'transform 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
//                 <div style={{ fontSize: '3rem' }}>🌺</div>
//                 <h4>Largest Flower</h4>
//                 <p>Rafflesia can grow 3 feet wide!</p>
//               </div>
//             </Col>
//             <Col xs={12} sm={6} lg={3}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: '15px',
//                 padding: '20px',
//                 textAlign: 'center',
//                 transition: 'transform 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
//                 <div style={{ fontSize: '3rem' }}>🌹</div>
//                 <h4>Rose Species</h4>
//                 <p>Over 100 species of roses exist!</p>
//               </div>
//             </Col>
//             <Col xs={12} sm={6} lg={3}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: '15px',
//                 padding: '20px',
//                 textAlign: 'center',
//                 transition: 'transform 0.3s ease'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
//                 <div style={{ fontSize: '3rem' }}>🌷</div>
//                 <h4>Tulip Mania</h4>
//                 <p>Tulips were worth more than gold!</p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Quote Section */}
//       <div className="text-center py-5" style={{ background: '#f5f0e7' }}>
//         <Container>
//           <p className="h3 fst-italic text-dark">
//             "Where flowers bloom, so does hope."
//           </p>
//           <p className="text-muted">- Lady Bird Johnson</p>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Home;



















import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const flowers = [
  {
    id: 1,
    name: 'Red Rose',
    scientificName: 'Rosa',
    color: 'Red',
    meaning: 'Love & Romance',
    image: 'https://i.pinimg.com/736x/c3/c7/29/c3c729eb0669c32938df446290032366.jpg',
    description: 'The classic symbol of love and passion. Red roses express deep emotions and romantic feelings.'
  },
  {
    id: 2,
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    color: 'Golden Yellow',
    meaning: 'Happiness & Loyalty',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=600&auto=format&fit=crop',
    description: 'Sunflowers follow the sun and represent joy, positivity, and long-lasting loyalty.'
  },
  {
    id: 3,
    name: 'Lavender',
    scientificName: 'Lavandula',
    color: 'Purple',
    meaning: 'Calm & Serenity',
    image: 'https://images.unsplash.com/photo-1565011523534-747a8601f10a?q=80&w=600&auto=format&fit=crop',
    description: 'Known for its soothing scent, lavender brings peace, relaxation, and tranquility.'
  },
  {
    id: 4,
    name: 'Pink Tulip',
    scientificName: 'Tulipa',
    color: 'Pink',
    meaning: 'Caring & Affection',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=600&auto=format&fit=crop',
    description: 'Pink tulips symbolize caring, good wishes, and attachment to someone special.'
  },
  {
    id: 5,
    name: 'White Lily',
    scientificName: 'Lilium',
    color: 'White',
    meaning: 'Purity & Elegance',
    image: 'https://i.pinimg.com/736x/58/0e/56/580e5636b4372a5316aae916cef540e2.jpg',
    description: 'White lilies represent purity, rebirth, and majestic beauty.'
  },
  {
    id: 6,
    name: 'Orchid',
    scientificName: 'Orchidaceae',
    color: 'Purple',
    meaning: 'Beauty & Strength',
    image: 'https://i.pinimg.com/736x/2f/d0/98/2fd0989b6d634525d97c05890c7b12ed.jpg',
    description: 'Exotic orchids symbolize rare beauty, strength, and luxury.'
  },
  {
    id: 7,
    name: 'Daisy',
    scientificName: 'Bellis perennis',
    color: 'White',
    meaning: 'Joy & Friendship',
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=600&auto=format&fit=crop',
    description: 'Daisies symbolize innocence, purity, and bring joy to any setting.'
  },
  {
    id: 8,
    name: 'Lotus',
    scientificName: 'Nelumbo nucifera',
    color: 'Pink',
    meaning: 'Spiritual Growth',
    image: 'https://i.pinimg.com/736x/5e/5b/f0/5e5bf06c558903b1ac95b93560116c00.jpg',
    description: 'The sacred lotus represents spiritual awakening and purity of heart.'
  },
  {
    id: 9,
    name: 'Hyacinth',
    scientificName: 'Hyacinthus',
    color: 'Purple',
    meaning: 'Sorrow & Forgiveness',
    image: 'https://i.pinimg.com/736x/e6/88/bf/e688bf047b6c0982dfb6f547b7bf7935.jpg',
    description: 'Hyacinths symbolize sincerity and represent deep emotions.'
  },
  {
    id: 10,
    name: 'Cherry Blossom',
    scientificName: 'Prunus serrulata',
    color: 'Pink',
    meaning: 'Renewal & Beauty',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=600&auto=format&fit=crop',
    description: 'Cherry blossoms symbolize the fleeting nature of life and beautiful beginnings.'
  },
  {
    id: 11,
    name: 'Daffodil',
    scientificName: 'Narcissus',
    color: 'Yellow',
    meaning: 'New Beginnings',
    image: 'https://i.pinimg.com/1200x/53/d4/98/53d498ae976bdc2fc1346135b977c1b4.jpg',
    description: 'Daffodils represent rebirth, new beginnings, and hope for the future.'
  },
  {
    id: 12,
    name: 'Marigold',
    scientificName: 'Tagetes',
    color: 'Orange',
    meaning: 'Passion & Creativity',
    image: 'https://i.pinimg.com/736x/90/91/c0/9091c09d7970f2919a9f52b813819670.jpg',
    description: 'Marigolds symbolize warm emotions, creativity, and positive energy.'
  }
];

const Home = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="success" />
        <span className="ms-3">Loading beautiful flowers...</span>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
        padding: '80px 20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container>
          <h1 className="display-4 fw-bold mb-3">
            🌸 Welcome to Flower Paradise {user?.name?.split(' ')[0] || 'Friend'}! 🌸
          </h1>
          <p className="lead">
            Discover the beauty, meaning, and magic of flowers from around the world
          </p>
        </Container>
      </div>

      {/* Flowers Gallery */}
      <Container className="py-5">
        <h2 className="text-center mb-5" style={{ color: '#2d6a4f', fontSize: '2.5rem' }}>
          Our Beautiful Flower Collection
        </h2>
        <Row className="g-4">
          {flowers.map((flower) => (
            <Col key={flower.id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <Card className="h-100 shadow-sm border-0" style={{
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                  <Card.Img 
                    variant="top" 
                    src={flower.image} 
                    style={{ 
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      opacity: loadedImages[flower.id] ? 1 : 0,
                      transition: 'opacity 0.5s ease'
                    }}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [flower.id]: true }))}
                  />
                  {!loadedImages[flower.id] && (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Spinner animation="border" variant="success" />
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="h3 mb-2" style={{ color: '#2d6a4f' }}>
                    {flower.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {flower.scientificName}
                  </Card.Subtitle>
                  <div className="mb-2">
                    <span className="badge bg-success me-2">🌸 {flower.color}</span>
                    <span className="badge bg-info text-white">💖 {flower.meaning}</span>
                  </div>
                  <Card.Text className="text-muted">
                    {flower.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Fun Facts Section */}
      <div style={{ background: '#2d6a4f', padding: '60px 0' }}>
        <Container>
          <h2 className="text-center text-white mb-5">🌼 Amazing Flower Facts 🌼</h2>
          <Row className="g-4">
            <Col xs={12} sm={6} lg={3}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ fontSize: '3rem' }}>🌻</div>
                <h4>Oldest Flower</h4>
                <p>Montsechia vidalii lived 130 million years ago!</p>
              </div>
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ fontSize: '3rem' }}>🌺</div>
                <h4>Largest Flower</h4>
                <p>Rafflesia can grow 3 feet wide!</p>
              </div>
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ fontSize: '3rem' }}>🌹</div>
                <h4>Rose Species</h4>
                <p>Over 100 species of roses exist!</p>
              </div>
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ fontSize: '3rem' }}>🌷</div>
                <h4>Tulip Mania</h4>
                <p>Tulips were worth more than gold!</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Quote Section */}
      <div className="text-center py-5" style={{ background: '#f5f0e7' }}>
        <Container>
          <p className="h3 fst-italic text-dark">
            "Where flowers bloom, so does hope."
          </p>
          <p className="text-muted">- Lady Bird Johnson</p>
        </Container>
      </div>
    </>
  );
};

export default Home;
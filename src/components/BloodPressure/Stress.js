import React from 'react';

const Stress = () => {
  const tips = [
    {
      title: 'Practice Mindfulness Meditation',
      description: 'Take a few minutes each day to focus on your breath and bring your attention to the present moment. Mindfulness meditation can help reduce stress and increase feelings of calmness.',
      color: '#FF6B6B',
    },
    {
      title: 'Engage in Physical Activity',
      description: 'Exercise releases endorphins, which are natural stress relievers. Whether it’s a brisk walk, yoga, or dancing, find an activity you enjoy and make it a regular part of your routine.',
      color: '#78e08f',
    },
    {
      title: 'Connect with Loved Ones',
      description: 'Spending time with friends and family can provide emotional support and help you feel more connected. Reach out to loved ones regularly, even if it’s just for a quick chat.',
      color: '#ffcc5c',
    },
    {
      title: 'Limit Screen Time',
      description: 'Constant exposure to screens can contribute to stress and anxiety. Set boundaries for yourself and take breaks from technology throughout the day.',
      color: '#7ed6df',
    },
    {
      title: 'Practice Gratitude',
      description: 'Take time each day to reflect on the things you’re grateful for. Keeping a gratitude journal or simply expressing appreciation for the small joys in life can shift your focus away from stressors.',
      color: '#f0932b',
    },
    {
      title: 'Get Quality Sleep',
      description: 'Prioritize sleep and establish a consistent bedtime routine. Aim for 7-9 hours of quality sleep each night to support overall well-being and stress management.',
      color: '#6d214f',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Stress Management Tips</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {tips.map((tip, index) => (
          <div key={index} style={{ maxWidth: '300px', padding: '20px', borderRadius: '10px', backgroundColor: tip.color }}>
            <h3 style={{ marginBottom: '10px', textAlign: 'center', color: '#fff' }}>{tip.title}</h3>
            <p style={{ color: '#fff' }}>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stress;
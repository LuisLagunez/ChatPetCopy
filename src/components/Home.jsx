import * as React from 'react';
import {useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
        <section>
            <h1 style={{ color: '#5d8c4c' }}>Hola mundo</h1>
        </section>
    </div>
  );
}
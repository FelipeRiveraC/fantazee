import React from 'react';
import { Head2HeadView } from '../components/Head2HeadView';
import { mockHead2HeadData } from '../mocks/head2head';

const Head2Head: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head2HeadView
        homeTeam={mockHead2HeadData.homeTeam}
        awayTeam={mockHead2HeadData.awayTeam}
      />
    </div>
  );
};

export default Head2Head; 
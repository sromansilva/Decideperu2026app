import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface CandidatesScreenProps {
  onSelectCandidate: (candidate: any) => void;
}

export function CandidatesScreen({ onSelectCandidate }: CandidatesScreenProps) {
  const [activeTab, setActiveTab] = useState('presidency');

  const presidencyCandidates = [
    {
      id: 1,
      name: 'Ana María Torres',
      party: 'Partido Democrático Nacional',
      shortParty: 'PDN',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Carlos Mendoza Silva',
      party: 'Alianza por el Progreso',
      shortParty: 'APP',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'María Elena Vega',
      party: 'Frente Renovador',
      shortParty: 'FR',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Roberto Campos',
      party: 'Unidad Nacional',
      shortParty: 'UN',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop',
    },
  ];

  const congressCandidates = [
    {
      id: 5,
      name: 'Patricia Ramírez',
      party: 'Partido Democrático Nacional',
      shortParty: 'PDN',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
    },
    {
      id: 6,
      name: 'Jorge Luis Santos',
      party: 'Alianza por el Progreso',
      shortParty: 'APP',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
    },
    {
      id: 7,
      name: 'Carmen Flores',
      party: 'Frente Renovador',
      shortParty: 'FR',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    },
    {
      id: 8,
      name: 'Miguel Ángel Vargas',
      party: 'Unidad Nacional',
      shortParty: 'UN',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    },
  ];

  const getCandidates = () => {
    switch (activeTab) {
      case 'congress':
        return congressCandidates;
      case 'senate':
        return congressCandidates.slice(0, 3);
      case 'andean':
        return presidencyCandidates.slice(0, 2);
      default:
        return presidencyCandidates;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-8">
        <h1>Candidatos 2026</h1>
        <p className="text-red-100 text-sm mt-2">Conoce a los candidatos registrados</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full inline-flex min-w-full bg-white rounded-none h-auto p-0">
            <TabsTrigger
              value="presidency"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3 px-6 whitespace-nowrap"
            >
              Presidencia
            </TabsTrigger>
            <TabsTrigger
              value="congress"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3 px-6 whitespace-nowrap"
            >
              Congreso
            </TabsTrigger>
            <TabsTrigger
              value="senate"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3 px-6 whitespace-nowrap"
            >
              Senado
            </TabsTrigger>
            <TabsTrigger
              value="andean"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3 px-6 whitespace-nowrap"
            >
              Parlamento Andino
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Candidates Grid */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {getCandidates().map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate)}
              className="bg-white rounded-lg shadow-sm p-4 w-full flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-1">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.party}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
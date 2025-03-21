
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CandidateData {
  name: string;
  votes: number;
  color: string;
}

interface CandidatePieChartProps {
  data: CandidateData[];
}

export const CandidatePieChart = ({ data }: CandidatePieChartProps) => {
  return (
    <>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="votes"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                border: 'none'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((candidate, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: candidate.color }}></div>
            <span className="truncate">{candidate.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

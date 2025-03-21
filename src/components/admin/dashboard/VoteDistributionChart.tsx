
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface VoteData {
  name: string;
  votes: number;
}

interface VoteDistributionChartProps {
  data: VoteData[];
}

export const VoteDistributionChart = ({ data }: VoteDistributionChartProps) => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              border: 'none'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="votes" 
            stroke="#3B82F6" 
            fillOpacity={1} 
            fill="url(#colorVotes)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

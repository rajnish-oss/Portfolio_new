import { motion } from "framer-motion";
import { Github, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";

const GitHubHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);

  // Generate contribution data for last 12 months
  const { weeks, totalContributions, months } = useMemo(() => {
    const data: { date: Date; count: number }[][] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // Go back ~52 weeks
    
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    let total = 0;
    let currentWeek: { date: Date; count: number }[] = [];
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      // Generate weighted random contributions (more realistic pattern)
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Higher chance of contributions on weekdays
      let count = 0;
      const rand = Math.random();
      
      if (isWeekend) {
        if (rand > 0.6) count = Math.floor(Math.random() * 8) + 1;
      } else {
        if (rand > 0.15) {
          // More active on weekdays
          if (rand > 0.9) count = Math.floor(Math.random() * 15) + 10; // High activity
          else if (rand > 0.6) count = Math.floor(Math.random() * 8) + 4; // Medium activity
          else count = Math.floor(Math.random() * 4) + 1; // Low activity
        }
      }
      
      // Add some "streak" patterns
      const monthNum = currentDate.getMonth();
      if (monthNum === 2 || monthNum === 6 || monthNum === 10) {
        count = Math.min(count + Math.floor(Math.random() * 5), 20);
      }
      
      total += count;
      currentWeek.push({ date: new Date(currentDate), count });
      
      if (currentDate.getDay() === 6) {
        data.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (currentWeek.length > 0) {
      data.push(currentWeek);
    }
    
    // Generate month labels
    const monthLabels: { name: string; weekIndex: number }[] = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;
    
    data.forEach((week, weekIndex) => {
      if (week[0]) {
        const month = week[0].date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ name: monthNames[month], weekIndex });
          lastMonth = month;
        }
      }
    });
    
    return { weeks: data, totalContributions: total, months: monthLabels };
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return "bg-[#1a1a2e]";
    if (count <= 3) return "bg-emerald-900/60";
    if (count <= 6) return "bg-emerald-700/80";
    if (count <= 10) return "bg-emerald-500";
    return "bg-emerald-400";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">GitHub Contributions</h3>
                <p className="text-xs text-primary uppercase tracking-wider">LAST 12 MONTHS</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold">{totalContributions.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">contributions</span>
            </div>
          </div>

          {/* Heatmap Container */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[750px]">
              {/* Month Labels */}
              <div className="flex mb-2 ml-10">
                {months.map((month, i) => (
                  <div
                    key={i}
                    className="text-xs text-muted-foreground"
                    style={{ 
                      position: 'relative',
                      left: `${month.weekIndex * 14}px`,
                      marginRight: i < months.length - 1 ? `${((months[i + 1]?.weekIndex || 52) - month.weekIndex - 1) * 14}px` : 0
                    }}
                  >
                    {month.name}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex gap-[3px]">
                {/* Day Labels */}
                <div className="flex flex-col gap-[3px] pr-2 text-xs text-muted-foreground justify-around">
                  <span className="h-[11px]"></span>
                  <span className="h-[11px] flex items-center">Mon</span>
                  <span className="h-[11px]"></span>
                  <span className="h-[11px] flex items-center">Wed</span>
                  <span className="h-[11px]"></span>
                  <span className="h-[11px] flex items-center">Fri</span>
                  <span className="h-[11px]"></span>
                </div>

                {/* Weeks */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const day = week[dayIndex];
                        if (!day) return <div key={dayIndex} className="w-[11px] h-[11px]" />;
                        
                        return (
                          <motion.div
                            key={dayIndex}
                            className={`w-[11px] h-[11px] rounded-sm ${getColor(day.count)} cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-primary/50`}
                            onMouseEnter={() => setHoveredCell({ date: formatDate(day.date), count: day.count })}
                            onMouseLeave={() => setHoveredCell(null)}
                            whileHover={{ scale: 1.3 }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary">💡</span>
              {hoveredCell ? (
                <span>
                  <span className="text-primary font-semibold">{hoveredCell.count} contributions</span> on {hoveredCell.date}
                </span>
              ) : (
                <span>Hover over squares to see details</span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Legend */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-[11px] h-[11px] rounded-sm bg-[#1a1a2e]" />
                  <div className="w-[11px] h-[11px] rounded-sm bg-emerald-900/60" />
                  <div className="w-[11px] h-[11px] rounded-sm bg-emerald-700/80" />
                  <div className="w-[11px] h-[11px] rounded-sm bg-emerald-500" />
                  <div className="w-[11px] h-[11px] rounded-sm bg-emerald-400" />
                </div>
                <span>More</span>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/anishchowdhury9935"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>@anishchowdhury9935</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubHeatmap;

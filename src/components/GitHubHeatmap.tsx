import { motion } from "framer-motion";
import { Github, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";
const GitHubHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
  } | null>(null);

  // Generate contribution data for last 12 months - controlled to reach ~50 total
  const {
    weeks,
    months
  } = useMemo(() => {
    const data: {
      date: Date;
      count: number;
    }[][] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    let currentWeek: {
      date: Date;
      count: number;
    }[] = [];
    const currentDate = new Date(startDate);

    // Pre-generate exactly 50 contributions spread across the year
    const contributionDays = new Set<string>();
    const totalDays = 365;
    const targetContributions = 50;
    while (contributionDays.size < targetContributions) {
      const randomDayOffset = Math.floor(Math.random() * totalDays);
      const randomDate = new Date(startDate);
      randomDate.setDate(randomDate.getDate() + randomDayOffset);
      if (randomDate <= today) {
        contributionDays.add(randomDate.toDateString());
      }
    }
    while (currentDate <= today) {
      const count = contributionDays.has(currentDate.toDateString()) ? 1 : 0;
      currentWeek.push({
        date: new Date(currentDate),
        count
      });
      if (currentDate.getDay() === 6) {
        data.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (currentWeek.length > 0) {
      data.push(currentWeek);
    }
    const monthLabels: {
      name: string;
      weekIndex: number;
    }[] = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;
    data.forEach((week, weekIndex) => {
      if (week[0]) {
        const month = week[0].date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({
            name: monthNames[month],
            weekIndex
          });
          lastMonth = month;
        }
      }
    });
    return {
      weeks: data,
      months: monthLabels
    };
  }, []);
  const getColor = (count: number) => {
    if (count === 0) return "bg-[#1a1a2e]";
    return "bg-emerald-500";
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const socialLinks = [{
    icon: "github",
    url: "https://github.com/anishchowdhury9935",
    label: "GitHub"
  }, {
    icon: "twitter",
    url: "https://x.com/Back_track_og",
    label: "Twitter/X"
  }, {
    icon: "discord",
    url: "#",
    label: "Discord"
  }, {
    icon: "email",
    url: "mailto:anish@example.com",
    label: "Email"
  }];
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Heatmap Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-secondary/50 border border-border rounded-2xl p-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-6 h-6 text-primary" />
              <h3 className="font-display font-semibold text-xl text-foreground">
                Contribution Activity
              </h3>
              <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>50 contributions</span>
              </div>
            </div>

            {/* Month Labels */}
            <div className="flex mb-2 ml-8">
              {months.map((month, i) => (
                <div
                  key={i}
                  className="text-xs text-muted-foreground"
                  style={{
                    marginLeft: i === 0 ? 0 : `${(month.weekIndex - (months[i - 1]?.weekIndex || 0)) * 14 - 20}px`,
                  }}
                >
                  {month.name}
                </div>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[3px] overflow-x-auto pb-2">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors duration-150`}
                      onMouseEnter={() =>
                        setHoveredCell({
                          date: formatDate(day.date),
                          count: day.count,
                        })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {hoveredCell && (
              <div className="mt-4 text-sm text-muted-foreground">
                {hoveredCell.count > 0
                  ? `${hoveredCell.count} contribution on ${hoveredCell.date}`
                  : `No contributions on ${hoveredCell.date}`}
              </div>
            )}
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-secondary/50 border border-border rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold text-xl text-foreground mb-6">
              LINKS
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <span className="text-muted-foreground">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default GitHubHeatmap;
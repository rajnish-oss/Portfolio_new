import { motion } from "framer-motion";
import { Github, TrendingUp, Mail } from "lucide-react";
import { useState, useMemo } from "react";

const GitHubHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
  } | null>(null);

  // Generate contribution data for last 12 months - controlled to reach ~50 total
  const { weeks, months } = useMemo(() => {
    const data: { date: Date; count: number }[][] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let currentWeek: { date: Date; count: number }[] = [];
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

    return { weeks: data, months: monthLabels };
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
      year: 'numeric',
    });
  };

  const socialLinks = [
    { icon: "github", url: "https://github.com/anishchowdhury9935", label: "GitHub" },
    { icon: "twitter", url: "https://x.com/Back_track_og", label: "Twitter/X" },
    { icon: "discord", url: "#", label: "Discord" },
    { icon: "email", url: "mailto:anish@example.com", label: "Email" },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <Github className="w-6 h-6" />;
      case "twitter":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "discord":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        );
      case "email":
        return <Mail className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Links Section - Left */}
          <div className="bg-secondary/50 border border-border rounded-2xl p-6">
            <h3 className="font-display font-bold text-4xl text-foreground mb-8 leading-tight">
              LIN<br />KS.
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 rounded-lg border border-primary/50 bg-background/30 hover:bg-primary/10 hover:border-primary transition-colors text-foreground"
                  aria-label={link.label}
                >
                  {renderIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Heatmap Section - Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-secondary/50 border border-border rounded-2xl p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Github className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground">
                    GITHUB CONTRIBUTIONS
                  </h3>
                  <p className="text-sm text-primary">LAST 12 MONTHS</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/50 text-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">50</span>
                <span className="text-muted-foreground">contributions</span>
              </div>
            </div>

            {/* Month Labels */}
            <div className="flex mb-2 ml-12">
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

            {/* Heatmap Grid with Day Labels */}
            <div className="flex gap-[3px] overflow-x-auto pb-2">
              {/* Day Labels */}
              <div className="flex flex-col gap-[3px] mr-2 justify-around">
                <span className="text-xs text-muted-foreground h-3 flex items-center">Mon</span>
                <span className="text-xs text-muted-foreground h-3 flex items-center">Wed</span>
                <span className="text-xs text-muted-foreground h-3 flex items-center">Fri</span>
              </div>

              {/* Grid */}
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors duration-150 cursor-pointer hover:ring-1 hover:ring-primary/50`}
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

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">💡</span>
                {hoveredCell ? (
                  <span>
                    {hoveredCell.count > 0
                      ? `${hoveredCell.count} contribution on ${hoveredCell.date}`
                      : `No contributions on ${hoveredCell.date}`}
                  </span>
                ) : (
                  <span>Hover over squares to see details</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Legend */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-sm bg-[#1a1a2e]" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <span>More</span>
                </div>

                {/* GitHub Link */}
                <a
                  href="https://github.com/anishchowdhury9935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>@anishchowdhury9935</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubHeatmap;
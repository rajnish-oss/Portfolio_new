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
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const socialLinks = [
    { icon: "github", url: "https://github.com/rajnish-oss", label: "GitHub" },
    { icon: "twitter", url: "https://x.com/rajnish_xio", label: "Twitter/X" },
    { icon: "email", url: "mailto:rajnishpandey844@gmail.com", label: "Email" },
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
              LIN
              <br />
              KS.
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
            viewport={{ once: false, margin: "-50px" }}
            className="bg-secondary/50 border border-border rounded-2xl p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Github className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground">GITHUB CONTRIBUTIONS</h3>
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
                  href="https://github.com/rajnish-oss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>rajnish</span>
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

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
  return;
};
export default GitHubHeatmap;
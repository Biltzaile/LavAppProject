import { useNavigate } from "react-router-dom";
import { useAppStore, useAuthStore } from "@/contexts";
import { privateRoutes } from "@/routers";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const accessibleRoutes = privateRoutes.filter(
    route => route.roles.includes(user?.rol ?? '')
  );

  const fecha = new Date("2024-11-28T08:27:23.213000+00:00")
  const actual = new Date("2024-11-20")
  return (
    <div className="self-center w-full max-w-6xl">
      <h1 className="text-2xl font-bold">{fecha.toISOString()}</h1>
      <h2 className="text-2xl font-bold">{actual.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        formatMatcher: "basic"
      })}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {accessibleRoutes.map((route) => (
          <DashboardCard
            key={route.path}
            icon={route.icon}
            title={route.title}
            onClick={() => navigate(`/${route.path}`)}
          />
        ))}
      </div>
    </div>
  );
};
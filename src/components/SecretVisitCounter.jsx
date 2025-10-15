"use client";
import { useEffect } from "react";

const SecretVisitCounter = () => {
  useEffect(() => {
    const storedData = localStorage.getItem("secretVisitData");
    const now = new Date();

    let visitData;
    if (storedData) {
      visitData = JSON.parse(storedData);
      visitData.count += 1;
      visitData.lastVisit = now.toISOString();
      visitData.visitHistory = visitData.visitHistory || [];
      visitData.visitHistory.push(now.toISOString());
    } else {
      visitData = {
        count: 1,
        firstVisit: now.toISOString(),
        lastVisit: now.toISOString(),
        visitHistory: [now.toISOString()],
      };
    }

    localStorage.setItem("secretVisitData", JSON.stringify(visitData));

    // Console message
    console.log(
      `%c💝 SECRET VISIT TRACKER`,
      "color: #ec4899; font-size: 16px; font-weight: bold;"
    );
    console.log(
      `%cTotal Visits: ${visitData.count}`,
      "color: #f472b6; font-size: 14px;"
    );
    console.log(
      `%cFirst Visit: ${new Date(visitData.firstVisit).toLocaleString()}`,
      "color: #f9a8d4;"
    );
    console.log(
      `%cLast Visit: ${new Date(visitData.lastVisit).toLocaleString()}`,
      "color: #f9a8d4;"
    );
    console.log(
      `%c👻 Pssst... this is our little secret!`,
      "color: #10b981; font-size: 12px;"
    );
  }, []);

  return null;
};

export default SecretVisitCounter;

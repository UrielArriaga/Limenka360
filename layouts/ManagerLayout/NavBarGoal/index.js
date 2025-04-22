import React from "react";
import GoalsSection from "./GoalSectionv6";
import GoalsSectionv1 from "./GoalSectionv1";
import GoalsSectionv2 from "./GoalSectionv2";

export default function NavBarGoal({ goalSelected, setShowGoal }) {
  const renderGoalsSection = () => {
    switch (goalSelected.version) {
      case 1:
        return <GoalsSectionv1 setShowGoal={setShowGoal} />;

      case 2:
        return <GoalsSectionv2 setShowGoal={setShowGoal} />;
      default:
        return <GoalsSection setShowGoal={setShowGoal} />;
    }
  };
  return renderGoalsSection();
}

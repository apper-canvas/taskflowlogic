import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority }) => {
  const config = {
    high: { variant: "high", icon: "AlertCircle", label: "High" },
    medium: { variant: "medium", icon: "AlertTriangle", label: "Medium" },
    low: { variant: "low", icon: "CircleDot", label: "Low" },
  };

  const { variant, icon, label } = config[priority] || config.medium;

  return (
    <Badge variant={variant}>
      <ApperIcon name={icon} size={12} className="mr-1" />
      {label}
    </Badge>
  );
};

export default PriorityBadge;
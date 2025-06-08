export default function getAvatarColor(id: number) {
  const colors = [
    "bg-yellow-500",
    "bg-green-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  return colors[id % colors.length];
}

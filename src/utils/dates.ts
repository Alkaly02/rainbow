export const formatDate = (dateString: string) => {
  // Séparer la date en [jour, mois, année]
  const [day, month, year] = dateString.split('/');

  // Construire une date en format ISO (YYYY-MM-DD)
  const fixedDate = `${year}-${month}-${day}`;

  return new Date(fixedDate).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

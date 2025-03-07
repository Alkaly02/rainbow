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


export function getTimeFromDateTime(datetimeString: string) {
  // Créer un objet Date à partir de la chaîne datetime
  const date = new Date(datetimeString);

  // Extraire les heures, minutes et secondes
  const hours = String(date.getHours()).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Retourner l'heure au format HH:MM:SS
  return `${hours}:${minutes}:${seconds}`;
}

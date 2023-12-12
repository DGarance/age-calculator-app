document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.querySelector(".button");
  calculateButton.addEventListener("click", calculateAge);
});

function calculateAge() {
  const yearInput = document.querySelector('input[placeholder="YYYY"]');
  const monthInput = document.querySelector('input[placeholder="MM"]');
  const dayInput = document.querySelector('input[placeholder="DD"]');

  const yearsResult = document.getElementById("years");
  const monthsResult = document.getElementById("months");
  const daysResult = document.getElementById("days");

  if (yearInput.value === "" || monthInput.value === "" || dayInput.value === "") {
    alert("Veuillez saisir toutes les informations de naissance.");
    return;
  }

  // Vérifier si les valeurs sont des nombres valides
  if (!isValidNumber(yearInput.value) || !isValidNumber(monthInput.value) || !isValidNumber(dayInput.value)) {
    alert("Veuillez saisir des nombres valides pour la date de naissance.");
    return;
  }

  const year = parseInt(yearInput.value);
  const month = parseInt(monthInput.value);
  const day = parseInt(dayInput.value);

  // Vérifier si les valeurs respectent les limites
  if (day < 1 || day > 31 || month < 1 || month > 12) {
    alert("Veuillez saisir des valeurs valides pour la date de naissance.");
    return;
  }

  const today = new Date();
  const selectedDate = new Date(year, month - 1, day);

  // Vérifier si la date est dans le futur
  if (selectedDate > today) {
    alert("La date de naissance ne peut pas être dans le futur.");
    return;
  }

  // Vérifier si la date est valide
  if (selectedDate.getDate() !== day || selectedDate.getMonth() !== month - 1 || selectedDate.getFullYear() !== year) {
    alert("Veuillez saisir une date de naissance valide.");
    return;
  }

  const age = calculateDifferenceInAge(today, selectedDate);

  yearsResult.innerText = age.years;
  monthsResult.innerText = age.months;
  daysResult.innerText = age.days;
}

function isValidNumber(value) {
  return /^\d+$/.test(value);
}

function calculateDifferenceInAge(date1, date2) {
  const diffInMilliseconds = Math.abs(date1 - date2);

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInMonth = 30.44 * millisecondsInDay;
  const millisecondsInYear = 365.25 * millisecondsInDay;

  const years = Math.floor(diffInMilliseconds / millisecondsInYear);
  const months = Math.floor((diffInMilliseconds % millisecondsInYear) / millisecondsInMonth);
  const days = Math.floor((diffInMilliseconds % millisecondsInMonth) / millisecondsInDay);

  return {
    years: years,
    months: months,
    days: days,
  };
}

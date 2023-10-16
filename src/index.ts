import Mustache from "mustache";
import axios from "axios";

function renderPage() {
	const templateData = {
		name: "Programmers test",
		categories: [], // Initialize categories as an empty array
	};

	async function fetchCategories() {
		try {
			const response = await axios.get("http://localhost:8080/categories");

			if (response.status !== 200) {
				throw new Error("Failed to fetch categories");
			}

			const categories = response.data;

			// Format the descriptions for each category
			categories.forEach((category) => {
				category.description = formatCategoryDescription(category.description);
			});

			// Update templateData with the fetched categories
			templateData.categories = categories;

			// Limit the categories to the first six
			const firstSixCategories = templateData.categories.slice(0, 6);

			// Update the categories in templateData
			templateData.categories = firstSixCategories;

			// Re-render the page with the updated data
			const template = document.getElementById("template").innerHTML;
			const rendered = Mustache.render(template, templateData);
			document.querySelector("main").innerHTML = rendered;
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	}

	function formatCategoryDescription(description) {
		// Split the description into words
		const words = description.split(" ");

		// Capitalize the first letter of each word and make the rest lowercase
		const formattedWords = words.map((word) => {
			if (word.length > 0) {
				const firstLetter = word[0].toUpperCase();
				const restOfWord = word.slice(1).toLowerCase();
				return firstLetter + restOfWord;
			}
			return "";
		});

		// Join the words back together with a space
		const formattedDescription = formattedWords.join(" ");

		return formattedDescription;
	}

	fetchCategories();
}

window.onload = () => {
	renderPage();
};

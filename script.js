// Puzzle answers and the pattern shown on the card.
// kanye's game of life ahh patter.
const pattern = [
	[0, 1, 1, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[0, 1, 0, 0, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0],
];

const numberAnswer = [ 4, 44, 42];
const passcodeAnswer = [4, "wewsharpeyes"];
const cardPasswords = [ "4", "alexisasiaaries", "ravenasiaaries", "password", "again", "12345678", "123456789", "1234567890"];
const finalPuzzleAnswer = "4";

// Turn the small puzzle pattern into visible grid cells (ant-man reference).
function drawBoard(board) {
	for (let row = 0; row < pattern.length; row++) {
		for (let column = 0; column < pattern[row].length; column++) {
			const cell = document.createElement("div");

			if (pattern[row][column] === 1) {
				cell.className = "cell on";
			} else {
				cell.className = "cell";
			}

			board.appendChild(cell);
		}
	}
}

// Draw the static pattern used on the puzzle board and card cover.
drawBoard(document.getElementById("coverArt"));

// Elements and state used to open the card and reveal the puzzles.
const card = document.getElementById("card");
const stage = document.querySelector(".stage");
const inside = document.getElementById("inside");
const toggleButton = document.getElementById("toggleBtn");
const secretButton = document.getElementById("secretTrigger");
const musicVideo = document.getElementById("musicVideo");
const videoHintArrow = document.getElementById("videoHintArrow");
const hintNote = document.getElementById("hintNote");
let passwordGateOpened = false;

// Keep the card visuals, button labels, and hidden content in sync.
function setCardOpen(isOpen) {
	card.classList.toggle("open", isOpen);
	stage.classList.toggle("is-open", isOpen);
	inside.inert = !isOpen;

	if (isOpen) {
		toggleButton.textContent = "Close";
	} else {
		toggleButton.textContent = "Open";
	}

	toggleButton.setAttribute("aria-expanded", String(isOpen));
	musicVideo.classList.toggle("hidden", !isOpen || passwordGateOpened);
	videoHintArrow.classList.toggle("hidden", !isOpen || passwordGateOpened);
	hintNote.classList.toggle("hidden", !isOpen || passwordGateOpened);
	secretButton.classList.toggle("hidden", isOpen);
}

// Open or close the card from its main button.
function toggleCard() {
	setCardOpen(!card.classList.contains("open"));
}

// Reveal the password form when the hidden cover button is clicked.
function showPasswordGate() {
	passwordGateOpened = true;
	stage.classList.add("has-password-gate");
	document.getElementById("passwordGate").classList.remove("hidden");
	musicVideo.classList.add("hidden");
	setCardOpen(true);
	document.getElementById("passwordInput").focus();
}

// Check the card password and reveal the puzzle section.
function checkCardPassword() {
	const passwordInput = document.getElementById("passwordInput");
	const passwordMessage = document.getElementById("passwordMessage");

	if (cardPasswords.includes(passwordInput.value.trim())) {
		document.getElementById("passwordGate").classList.add("hidden");
		document.getElementById("puzzle").classList.remove("hidden");
		card.classList.add("wide");
		passwordMessage.textContent = "";
	} else {
		passwordMessage.textContent = "Incorrect password. Please try again.";
		passwordMessage.className = "msg bad";
		passwordInput.select();
	}
}

// Check Puzzle 1 and reveal Puzzle 2 when the answer is accepted.
function checkFirstPuzzle() {
	const answer = Number(document.getElementById("answer").value);
	const message = document.getElementById("msg1");

	if (numberAnswer.includes(answer)) {
		message.className = "msg ok";
		document.getElementById("p1").classList.add("hidden");
		document.getElementById("p2").classList.remove("hidden");
	} else {
		message.textContent = "Not quite. try again.";
		message.className = "msg bad";
	}
}

// Check Puzzle 2's passcode and reveal Puzzle 3.
function checkPasscode() {
	const passcode = document.getElementById("num2").value.trim().toLowerCase();
	const message = document.getElementById("passcodeMessage");

	if (passcodeAnswer.map(String).includes(passcode)) {
		message.className = "msg ok";
		document.getElementById("p2").classList.add("hidden");
		document.getElementById("p3").classList.remove("hidden");
	} else {
		message.textContent = "That is incorrect. Try again.";
		message.className = "msg bad";
	}
}

let riddleStage = 0;

// Reveal the decoy, then the real riddle, before checking its answer.
function checkRiddleAnswer() {
	const title = document.getElementById("riddleTitle");
	const prompt = document.getElementById("riddlePrompt");
	const answerInput = document.getElementById("riddleAnswer");
	const message = document.getElementById("riddleMessage");

	if (riddleStage === 0) {
		title.innerHTML = `<b>P̴̤̓ŭ̵̢z̷͛͜ź̸̼l̵͇͠e̶͖͛ ̵͉̓3̴̧̇ ̸̧̑·̷͓̾ ̴͑ͅA̵̛̲ ̸̝̉D̷̪̀e̴̡̊č̴̟ȯ̶̖y̷͙͠</b>`;
		prompt.innerHTML = `<b>W̷͕̑h̵͎͘a̶̯͆ť̶̨ ̴̥͝h̴͚͌ä̷̯́s̸͇̈́ ̶̤̐a̸̖͑ ̵̝̄f̵͖͘a̴͓̎c̶̨̅e̴̥̅ ̸̘͠ä̸̰n̵̟̅d̸̼̊ ̵̭̋t̷̗̓w̶̘̓o̷͘ͅ ̶̮̚h̸̛̤ȁ̵͚n̷͎̍d̸̟͐s̶̖͘ 
		̵̝̋ḃ̶͉ŭ̴̺t̶̘̓ ̸͔̈́n̶̠̅o̶̤̽ ̵͖͘a̴̖͆r̶̞̽m̵̈ͅş̸͠ ̴͕̇o̷̺͊r̴͎̒ ̷̩̾l̵̫͝ḛ̸̿g̸͔̉s̵̭̊?̴̛͓W̷͕̑h̵͎͘a̶̯͆ť̶̨ ̴̥͝h̴͚͌ä̷̯́s̸͇̈́ ̶̤̐a̸̖͑ ̵̝̄f̵͖͘a̴͓̎c̶̨̅e̴̥̅ ̸̘͠ä̸̰n̵̟̅d̸̼̊ ̵̭̋t̷̗̓w̶̘̓o̷͘ͅ ̶̮̚h̸̛̤ȁ̵͚n̷͎̍d̸̟͐s̶̖͘ ̵̝̋ḃ̶͉ŭ̴̺
		t̶̘̓ ̸͔̈́n̶̠̅o̶̤̽ ̵͖͘a̴̖͆r̶̞̽m̵̈ͅş̸͠ ̴͕̇o̷̺͊r̴͎̒ ̷̩̾l̵̫͝ḛ̸̿g̸͔̉s̵̭̊?̴̛͓W̷͕̑h̵͎͘a̶̯͆ť̶̨ ̴̥͝h̴͚͌ä̷̯́s̸͇̈́ ̶̤̐a̸̖͑ ̵̝̄f̵͖͘a̴͓̎c̶̨̅e̴̥̅ ̸̘͠ä̸̰n̵̟̅d̸̼̊ ̵̭̋t̷̗̓w̶̘̓o̷͘ͅ ̶̮̚h̸̛̤ȁ̵͚n̷͎̍d̸̟͐s̶̖͘ ̵̝̋ḃ̶͉ŭ̴̺t̶̘̓ ̸͔̈́
		n̶̠̅o̶̤̽ ̵͖͘a̴̖͆r̶̞̽m̵̈ͅş̸͠ ̴͕̇o̷̺͊r̴͎̒ ̷̩̾l̵̫͝ḛ̸̿g̸͔̉s̵̭̊?̴̛͓W̷͕̑h̵͎͘a̶̯͆ť̶̨ ̴̥͝h̴͚͌ä̷̯́s̸͇̈́ ̶̤̐a̸̖͑ ̵̝̄f̵͖͘a̴͓̎c̶̨̅e̴̥̅ ̸̘͠ä̸̰n̵̟̅d̸̼̊ ̵̭̋t̷̗̓w̶̘̓o̷͘ͅ ̶̮̚h̸̛̤ȁ̵͚n̷͎̍d̸̟͐s̶̖͘ ̵̝̋ḃ̶͉ŭ̴̺t̶̘̓ ̸͔̈́n̶̠̅o̶̤̽ 
		̵͖͘a̴̖͆r̶̞̽m̵̈ͅş̸͠ ̴͕̇o̷̺͊r̴͎̒ ̷̩̾l̵̫͝ḛ̸̿g̸͔̉s̵̛̭͓̊</b>`;
		prompt.classList.remove("hidden");
		message.textContent = "N̵o̸t̵ ̴q̵u̸i̵t̵e̴.̴ ̷T̷r̷y̶ ̵t̴h̷i̸s̸ ̷r̷̷̷i̴̶̴d̵̴̵d̴̴̵l̸̸̸e̶̸̴.̸̵̶ (1 Try left)";
		message.className = "msg bad";
		riddleStage = 1;
		return;
	}

	if (riddleStage === 1) {
		title.innerHTML = `Puzzle 3 · The <b>Gratitude</b>`;
		prompt.innerHTML = `<b>Gratitude</b> is the feeling 
		or quality of being thankful, appreciative, and recognizing 
		goodness or help that comes from external sources, such 
		as other people, nature, or life circumstances.<br><br>
		After reading the definition of gratitude, what do you 
		think is the answer?<p>if you still cant figure it out... 
		<br><b>admin key is 4 ;-;</b></p>`;
		answerInput.value = "";
		message.textContent = "";
		message.className = "msg";
		riddleStage = 2;
		return;
	}

		if (answerInput.value === finalPuzzleAnswer) {
		document.getElementById("puzzle").classList.add("hidden");
		document.getElementById("message").classList.remove("hidden");
		document.body.classList.add("message-open"); // new line

		const player = document.getElementById("ytplayer");
		player.src = player.dataset.src; // video loads and autoplays only now
	} else {
		message.textContent = "Not quite. Try again. (999 Tries left)";
		message.className = "msg bad";
	}
}

// Connect the page buttons to their actions.
toggleButton.addEventListener("click", toggleCard);
secretButton.addEventListener("click", showPasswordGate);
document.getElementById("passwordBtn").addEventListener("click", checkCardPassword);
document.getElementById("checkBtn").addEventListener("click", checkFirstPuzzle);
document.getElementById("checkPasscodeBtn").addEventListener("click", checkPasscode);
document.getElementById("checkRiddleBtn").addEventListener("click", checkRiddleAnswer);

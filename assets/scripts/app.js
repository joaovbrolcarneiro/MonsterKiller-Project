const ATTACK_VALUE = 10;
const HEAL_VALUE = 5;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 13;
const BONUS_LIFE = 1;

const ATTACK_MONSTER = 'ATTACK';
const STRONG_ATTACK_MONSTER = 'STRONG_ATTACK';
const HEAL_PLAYER = 'HEAL';
const ATTACK_PLAYER = 'MONSTER_ATTACK';

const enteredValue = prompt('Choose the maximum life for you and the monster.', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, target, val, monsterHealth) {
    let logEntry = {
        event: ev,
        target: target,
        value: val,
        monsterHealth: monsterHealth,
    };

    if (ev === ATTACK_MONSTER || ev === STRONG_ATTACK_MONSTER) {
        logEntry.target = 'MONSTER';
    } else if (ev === HEAL_PLAYER) {
        logEntry.target = 'PLAYER';
    } else if (ev === ATTACK_PLAYER) {
        logEntry.target = 'PLAYER';
    }

    battleLog.push(logEntry);
}

function attackMonster(mode) {
    const maxDamage = mode === 'STRONG' ? STRONG_ATTACK_VALUE : ATTACK_VALUE;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(mode === 'STRONG' ? STRONG_ATTACK_MONSTER : ATTACK_MONSTER, 'MONSTER', damage, currentMonsterHealth);
    endRound();
}

function endRound() {
    let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = chosenMaxLife * 0.5;
        setPlayerHealth(currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        resetGame(chosenMaxLife);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        resetGame(chosenMaxLife);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("It's a draw!");
        resetGame(chosenMaxLife);
    }
}

function healPlayer() {
    let healValue = currentPlayerHealth + HEAL_VALUE > chosenMaxLife ? chosenMaxLife - currentPlayerHealth : HEAL_VALUE;

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(HEAL_PLAYER, 'PLAYER', healValue, currentMonsterHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', function () {
    attackMonster('NORMAL');
});

strongAttackBtn.addEventListener('click', function () {
    attackMonster('STRONG');
});

healBtn.addEventListener('click', function () {
    healPlayer();
});

logBtn.addEventListener('click', function () {
    printLogHandler();
});

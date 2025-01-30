const ATTACK_VALUE = 10;
const HEAL_VALUE = 5;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 13;
const BONUS_LIFE = 1;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars (chosenMaxLife);

function attackMonster(mode)
{
    let maxDamage = 0;

    if (mode === 'STRONG')
    {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    else
    {
        maxDamage = ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;
    endRound();
}

function endRound()
{
    let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth = currentPlayerHealth - playerDamage;

    if ((currentPlayerHealth <= 0) && hasBonusLife)
    {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = chosenMaxLife * 0.5;
        setPlayerHealth(currentPlayerHealth);
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) 
    {
        alert('You won!');
        resetGame(chosenMaxLife);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) 
      {
        alert('You lost!');
        resetGame(chosenMaxLife);
      } 
      else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0)
      {
        alert('It\'s a draw!');
        resetGame(chosenMaxLife);
      }
}

function healPlayer()
{   
    let healValue;

    if (chosenMaxLife < (currentPlayerHealth + HEAL_VALUE))
    {
        healValue = chosenMaxLife - currentPlayerHealth;
    }
    else
    {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth = currentPlayerHealth + healValue;
    endRound();
}

attackBtn.addEventListener ('click', function()
{

    attackMonster('NORMAL');
})
strongAttackBtn.addEventListener('click', function()
{

    attackMonster('STRONG');
})
healBtn.addEventListener('click', function() 
{

    healPlayer();
})

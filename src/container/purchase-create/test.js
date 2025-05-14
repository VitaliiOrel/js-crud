вариант 1:

myInput.addEventListener('input', function(event) {
  const enteredValue = event.target.value;

  ...  остаток кода ...

}

вариант 2:

inputBonus.addEventListener('input', function () {
  const inputedBonus = inputBonus.value

  ...  остаток кода ...

})


<h3>Your order details</h3>
  <form method="POST" action="/confirm-order">

    <div class="mCard__content">

      <div class="mCard__field1">
        <label for="firstname">Name</label>
        <input type="text" name="firstname" required>
      </div>

      <div class="mCard__field2">
        <label for="surname">Surname</label>
        <input type="text" name="surname" required>
      </div>

    </div>

    <button>Confirm order</button> <span class="totalInfo" id="totalInfo">до поры невидимый</span>

  </form>

  toPayForm.value = toPay.textContent
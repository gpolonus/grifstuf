<script>
  const tv = fn => ({ target: { value } }) => fn(value)

  const multipleCompounds = ({ P, r, n, t }) => {
    return P * (1 + ((r / 100) / n)) ** (n * t)
  }

  const oneCompound = (values) => {
    console.log(values)
    const vs = {
      ...values,
      n: 1
    }
    return multipleCompounds(vs)
  }

  const timeToAmount = ({ A, P, r, n = 1 }) => Math.log(A/P) / (n * Math.log(1 + r/100/n))

  const TYPE_NAMES = {
    MULTIPLE: 'A = P(1 + r/n)^nt',
    ONE: 'A = P(1 + r)^t',
    TIME: 't = ln(A/P) / n[ln(1 + r/n)]'
  }

  const calcTypes = {
    [TYPE_NAMES.MULTIPLE]: multipleCompounds,
    [TYPE_NAMES.ONE]: oneCompound,
    [TYPE_NAMES.TIME]: timeToAmount
  }

  let calcType = $state(TYPE_NAMES.ONE)

  const values = $state({})
</script>

<style>
  div {
    padding: 1rem 0;
  }
</style>

<div>
  <ul>
    <li>A = Accrued Amount (principal + interest)</li>
    <li>P = Principal Amount</li>
    <li>I = Interest Amount</li>
    <li>R = Annual Nominal Interest Rate in percent</li>
    <li>r = Annual Nominal Interest Rate as a decimal</li>
    <li>r = R/100</li>
    <li>t = Time Involved in years, 0.5 years is calculated as 6 months, etc.</li>
    <li>n = number of compounding periods per unit t; at the END of each period</li>
  </ul>
</div>

<div>
  <select bind:value={calcType}>
    {#each Object.values(TYPE_NAMES) as typeName}
      <option value={typeName}>{typeName}</option>
    {/each}
  </select>
</div>

{#if calcType === TYPE_NAMES.ONE}
  <div>
    P: <input type='number' value={values.P} onchange={tv(P => values.P = P)} />
  </div>
  <div>
    r: <input type='number' value={values.r} onchange={tv(r => values.r = r)} />%
  </div>
  <div>
    t: <input type='number' value={values.t} onchange={tv(t => values.t = t)} />
  </div>
{:else if calcType === TYPE_NAMES.MULTIPLE}
  <div>
    P: <input type='number' value={values.P} onchange={tv(P => values.P = P)} />
  </div>
  <div>
    r: <input type='number' value={values.r} onchange={tv(r => values.r = r)} />%
  </div>
  <div>
    n: <input type='number' value={values.n} onchange={tv(n => values.n = n)} />
  </div>
  <div>
    t: <input type='number' value={values.t} onchange={tv(t => values.t = t)} />
</div>
{:else if calcType === TYPE_NAMES.TIME}
  <div>
    <div>
      P: <input type='number' value={values.P} onchange={tv(P => values.P = P)} />
    </div>
    <div>
      A: <input type='number' value={values.A} onchange={tv(A => values.A = A)} />
    </div>
    <div>
      r: <input type='number' value={values.r} onchange={tv(r => values.r = r)} />%
    </div>
    <div>
      n: <input type='number' value={values.n || 1} onchange={tv(n => values.n = n)} />
    </div>
  </div>
{/if}

<div>
  Result: {calcTypes[calcType](values)}
</div>
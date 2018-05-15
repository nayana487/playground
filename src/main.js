const {run}= require('@cycle/run');
const {div, label,input,hr,h1,makeDOMDriver}= require('@cycle/dom');


function main (sources) {
  console.log("sources", sources)
  const vdom = sources.DOM
    .select('.myinput, .yourinput')
    .events('input')
    .map(ev => ({
      value: ev.target.value,
      name: ev.target.name
    })
    )
    .startWith('deez nuts')
    .map(props => {
      console.log(props)
      let personsName = props.name === 'name' ? props.value : props
      let personsAge = props.name === 'age' ? props.value : '666'

      return div([
        label('Name:'),
        input('.myinput', {attrs: {type: 'text', name: 'name'}}),
        input('.yourinput', {attrs: {type: 'number', name: 'age'}}),
        hr(),
        h1(` ${personsName}, you are ${personsAge}`)
      ])
    })
  return {
    DOM: vdom
  }
}

const drivers = {
  DOM: makeDOMDriver('#main-container')
};

run(main, drivers);

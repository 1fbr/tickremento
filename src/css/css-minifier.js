import postcss from 'postcss'
import cssnano from 'cssnano'
import fs from 'fs'

fs.readdir('src/css/', (err, files) => {
  if (err) console.log(err)
  const cssFiles = files.filter(file => file.endsWith('.css'))
  const css = cssFiles.map(file => fs.readFileSync(`src/css/${file}`, 'utf8'))
  const joinedCss = css.join('')

  postcss([cssnano({ preset: 'default' })])
    .process(joinedCss, { from: undefined })
    .then(result => {
      fs.writeFileSync('dist/css/bundle.min.css', result.css)
    })
})

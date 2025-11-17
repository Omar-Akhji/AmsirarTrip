// PostCSS pipeline responsible for generating and optimising all project styles.
import autoprefixer from 'autoprefixer'

export default {
    plugins: [
        autoprefixer(),
    ],
}

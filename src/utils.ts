import chalk from 'chalk'

export async function loopInput(block: () => Promise<any>) {
  let loop = true

  do {
    try {
      const result = await block()
      loop = false
      return result
    } catch (error) {
      loop = true
      if (error instanceof Error) {
        console.log('\n' + chalk.bold.red('• ' + error.message) + '\n')
      }
    }
  } while (loop)
}

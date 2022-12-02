import { readFileSync } from 'fs'
import { join } from 'path'

import csv2json from 'csvjson-csv2json'

export const AvatarData = csv2json(String(readFileSync(join(
  __dirname, '..', '..', 'resources', 'exceloutput', 'AvatarData.tsv'))), { parseNumbers: true }) as []
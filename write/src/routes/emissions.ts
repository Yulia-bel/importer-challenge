import express from 'express'
import fs from 'fs'
import * as csv from 'fast-csv';
import multer from 'multer'
import { Emissions } from '../models/Emissions'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const headersArray: string[] = ['country', 'sector', 'parentSector', '1850', '1851', '1852', '1853', '1854', '1855', '1856', '1857', '1858', '1859', '1860', '1861', '1862', '1863', '1864', '1865', '1866', '1867', '1868', '1869', '1870', '1871', '1872', '1873', '1874', '1875', '1876', '1877', '1878', '1879', '1880', '1881', '1882', '1883', '1884', '1885', '1886', '1887', '1888', '1889', '1890', '1891', '1892', '1893', '1894', '1895', '1896', '1897', '1898', '1899', '1900', '1901', '1902', '1903', '1904', '1905', '1906', '1907', '1908', '1909', '1910', '1911', '1912', '1913', '1914', '1915', '1916', '1917', '1918', '1919', '1920', '1921', '1922', '1923', '1924', '1925', '1926', '1927', '1928', '1929', '1930', '1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938', '1939', '1940', '1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014']


router.post('/', upload.single('emissions'), async (req, res) => {

	await Emissions.deleteMany({})

	try {
		const csvFile: any = req.file

		let stream = fs.createReadStream(csvFile.path)

		let csvStream = csv.parse({ headers: headersArray, renameHeaders: true })
			.on("data", function (data) {
				try {
					Emissions.create(data)
				} catch (err) {
					console.error(err)
				}
			})
			.on("end", function () {
				console.log('End of Stream')
			})
		stream.pipe(csvStream)

		res.json({ successMessage: 'File saved' })
	} catch (error) {
		res.json({ errorMessage: error })
	}

})

export { router }
import hashlib
class CacheBuild :
	def __init__(self):
		self._maps = {}
		
	def build(self, file):
		needbuild = False
		sourcehash = self.calcSourceHash(file)
		targethash = self.calcTargerHash(file)
		map = self._maps.get(file, None)
		if map == None :
			map = {'source':'', 'target':''}
			self._maps[file] = map
			needbuild = True
		elif map['source'] != sourcehash or map['target'] != targethash:
			needbuild = True
			
		if needbuild :
			map['source'] = sourcehash
			print ' ... '
			map['target'] = self.calcTargerHash(file)
			
	def calcSourceHash(self, file):
		return self.calcFileHasn(file)
		
	def calcTargerHash(self, file):
		return self.calcFileHasn(file[0:-2] + 'lua' )
	
	def calcFileHasn(self, file):
		try:
			md5file=open(file,'rb')
			md5=hashlib.md5(md5file.read()).hexdigest()
			md5file.close()
			return md5
		except:
			return ''

CacheBuild().build(r'F:\circlechat\typescriptForLua\TypeScript-lua\src\compiler\emitter.ts')
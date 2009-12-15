
benchmark: benchmarks/benchmark.js
	 @js benchmarks/benchmark.js

test:
	@jspec run --rhino
	
.PHONY: benchmark test
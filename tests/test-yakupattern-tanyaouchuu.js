TESTS.push(new TestYakuPatternTanyaouChuu());

function TestYakuPatternTanyaouChuu() {
    this.runTests = function() {
        var tanyaouChuu = new TanyaouChuu();
        var validHand = [
            new BambooTile(2), new BambooTile(3), new BambooTile(4),
            new BambooTile(6), new BambooTile(7), new BambooTile(8),
            new CharacterTile(3), new CharacterTile(4), new CharacterTile(5),
            new DotTile(3), new DotTile(3), new DotTile(3),
            new DotTile(7), new DotTile(7)
        ];
        test("tanyaou chuu (all simples) valid hand", function(){
            ok(tanyaouChuu.check(validHand));
        });
        
        var invalidHandWithHonorTile = [
            new BambooTile(2), new BambooTile(3), new BambooTile(4),
            new BambooTile(6), new BambooTile(7), new BambooTile(8),
            new CharacterTile(3), new CharacterTile(4), new CharacterTile(5),
            new DragonTile("red"), new DragonTile("red"), new DragonTile("red"),
            new DotTile(7), new DotTile(7)
        ];
        test("tanyaou chuu (all simples) invalid hand with honor tiles", function(){
            ok(tanyaouChuu.check(invalidHandWithHonorTile) == false);
        });
        
        var invalidHandWithTerminalTile = [
            new BambooTile(2), new BambooTile(3), new BambooTile(4),
            new BambooTile(7), new BambooTile(8), new BambooTile(9),
            new CharacterTile(3), new CharacterTile(4), new CharacterTile(5),
            new DotTile(3), new DotTile(3), new DotTile(3),
            new DotTile(7), new DotTile(7)
        ];
        test("tanyaou chuu (all simples) invalid hand with terminal tile", function(){
            ok(tanyaouChuu.check(invalidHandWithTerminalTile) == false);
        });
    };
}

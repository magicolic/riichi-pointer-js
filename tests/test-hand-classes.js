TESTS.push(new TestHandClasses());

function TestHandClasses() {
    this.runTests = function() {
    
        // hand test
        var concealedHandCombinaisons = [
            new Pon(new DragonTile('white')),
            new Pon(new DotTile(6)),
            new Kan(new CharacterTile(9)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('east'))
        ];
        var openHandCombinaisons = [];
        var hand = new Hand(concealedHandCombinaisons, openHandCombinaisons, 'east', 'north');
        test('hand has five concealed hand combinaison', function() {
            ok(hand.concealedCombinaisons.length === 5);
        });
        test('hand has zero open hand combinaison', function() {
            ok(hand.openCombinaisons.length === 0);
        });
        test('hand has five hand combinaison', function() {
            ok(hand.combinaisons.length === 5);
        });
        test('hand has valid combinaison', function() {
            ok(hand.concealedCombinaisons === concealedHandCombinaisons);
            ok(hand.openCombinaisons === openHandCombinaisons);
            ok(hand.seatWind === 'east');
            ok(hand.roundWind === 'north');
        });
        
        // hand isFinish() test
        var notFinishHandWhenEmpty = new Hand([], []);
        test('hand is not finish when empty', function() {
            ok(notFinishHandWhenEmpty.isFinish() === false);
        });
        
        var notFinishHandWhenNotEnoughCombinaison = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Pair(new WindTile('east'))
        ], []);
        test('hand is not finish when less than 4 combinaison', function(){
            ok(notFinishHandWhenNotEnoughCombinaison.isFinish() === false);
        });
        
        var notFinishHandWhenNoPair = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pon(new WindTile('east'))
        ], []);
        test('hand is not finish without a pair', function(){
            ok(notFinishHandWhenNoPair.isFinish() === false);
        });
        
        var finishHandWith4CombinaisonAnd1Pair = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('east'))
        ], []);
        test('hand is finish with 4 combinaison and 1 pair', function(){
            ok(finishHandWith4CombinaisonAnd1Pair.isFinish() === true);
        });
        
        var finishHandWithSevenPairs = new Hand([
            new Pair(new DragonTile('red')),
            new Pair(new DragonTile('white')),
            new Pair(new DragonTile('green')),
            new Pair(new WindTile('east')),
            new Pair(new WindTile('west')),
            new Pair(new WindTile('north')),
            new Pair(new WindTile('south'))
        ], []);
        test('hand is finish with 7 pairs', function(){
            ok(finishHandWithSevenPairs.isFinish() === true);
        });
        
        // wait test
        var validTwoSidedWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 0, 0);
        var validEdgeWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 0, 2);
        var validClosedWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 0, 1);
        var validSingleWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 4, 0);
        test('hand is a two-sided wait', function(){
            ok(validTwoSidedWait.isSingleWait() === false);
            ok(validTwoSidedWait.isClosedWait() === false);
            ok(validTwoSidedWait.isEdgeWait() === false);
            ok(validTwoSidedWait.isTwoSidedWait() === true);
        });
        test('hand is a edge wait', function(){
            ok(validEdgeWait.isSingleWait() === false);
            ok(validEdgeWait.isClosedWait() === false);
            ok(validEdgeWait.isEdgeWait() === true);
            ok(validEdgeWait.isTwoSidedWait() === false);
        });
        test('hand is a closed wait', function(){
            ok(validClosedWait.isSingleWait() === false);
            ok(validClosedWait.isClosedWait() === true);
            ok(validClosedWait.isEdgeWait() === false);
            ok(validClosedWait.isTwoSidedWait() === false);
        });
        test('hand is a single wait', function(){
            ok(validSingleWait.isSingleWait() === true);
            ok(validSingleWait.isClosedWait() === false);
            ok(validSingleWait.isEdgeWait() === false);
            ok(validSingleWait.isTwoSidedWait() === false);
        });
        
        // pair test
        var pair = new Pair(new DragonTile('green'));
        test('pair is a hand combinaison', function() {
            ok(pair instanceof HandCombinaison);
        });
        test('pair is a pair', function() {
            ok(pair instanceof Pair);
        });
        test('pair has two tiles', function() {
            ok(pair.tiles.length == 2);
        });
        test('pair has two green dragon', function() {
            ok(pair.tiles[0] instanceof DragonTile && pair.tiles[0].color == 'green');
            ok(pair.tiles[1] instanceof DragonTile && pair.tiles[1].color == 'green');
        });
        
        // pon test
        var pon = new Pon(new WindTile('south'));
        test('pon is a hand combinaison', function() {
            ok(pon instanceof HandCombinaison);
        });
        test('pon is a pon', function() {
            ok(pon instanceof Pon);
        });
        test('pon has three tiles', function() {
            ok(pon.tiles.length == 3);
        });
        test('pon has three south wind', function() {
            ok(pon.tiles[0] instanceof WindTile && pon.tiles[0].direction == 'south');
            ok(pon.tiles[1] instanceof WindTile && pon.tiles[1].direction == 'south');
            ok(pon.tiles[2] instanceof WindTile && pon.tiles[2].direction == 'south');
        });
        
        // kan test
        var kan = new Kan(new DotTile(1));
        test('kan is a hand combinaison', function() {
            ok(kan instanceof HandCombinaison);
        });
        test('kan is a kan', function() {
            ok(kan instanceof Kan);
        });
        test('kan has four tiles', function() {
            ok(kan.tiles.length == 4);
        });
        test('kan has four 1 of dot', function() {
            ok(kan.tiles[0] instanceof DotTile && kan.tiles[0].number == 1);
            ok(kan.tiles[1] instanceof DotTile && kan.tiles[1].number == 1);
            ok(kan.tiles[2] instanceof DotTile && kan.tiles[2].number == 1);
            ok(kan.tiles[3] instanceof DotTile && kan.tiles[3].number == 1);
        });
        
        // chii test
        var chii = new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6));
        test('chii is a hand combinaison', function() {
            ok(chii instanceof HandCombinaison);
        });
        test('chii is a chii', function() {
            ok(chii instanceof Chii);
        });
        test('chii has three tiles', function() {
            ok(chii.tiles.length == 3);
        });
        test('chii has 4,5,6 of bamboo', function() {
            ok(chii.tiles[0] instanceof BambooTile && chii.tiles[0].number == 4);
            ok(chii.tiles[1] instanceof BambooTile && chii.tiles[1].number == 5);
            ok(chii.tiles[2] instanceof BambooTile && chii.tiles[2].number == 6);
        });
        
        // factory test
        test('HandCombinaisonFactory create pair', function(){
            var combinaison = HandCombinaisonFactory.create('pair', TileFactory.create('dot', 1));
            ok(combinaison instanceof Pair);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1);
        });
        test('HandCombinaisonFactory create pon', function(){
            var combinaison = HandCombinaisonFactory.create('pon', TileFactory.create('dot', 1));
            ok(combinaison instanceof Pon);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1);
            ok(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 1);
        });
        test('HandCombinaisonFactory create kan', function(){
            var combinaison = HandCombinaisonFactory.create('kan', TileFactory.create('dot', 1));
            ok(combinaison instanceof Kan);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1);
            ok(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 1);
            ok(combinaison.tiles[3] instanceof DotTile && combinaison.tiles[3].value === 1);
        });
        test('HandCombinaisonFactory create chii', function(){
            var combinaison = HandCombinaisonFactory.create('chii', TileFactory.create('dot', 1));
            ok(combinaison instanceof Chii);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 2);
            ok(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 3);
        });
        
    };
}

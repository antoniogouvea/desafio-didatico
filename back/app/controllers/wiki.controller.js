const WikiService = require('../services/wiki.service');
const wikiService = new WikiService()

class WikiController {
    constructor() {

    }

    async findWiki(req,res) {
        let find = req.query
        try {
            if(find.termo){
                let busca = await wikiService.find(find.termo)
                return res.status(200).json(busca.data.query.search)
            }
            
          
        } catch (error) {
            return res.status(400)
        }
    }
}
module.exports = WikiController
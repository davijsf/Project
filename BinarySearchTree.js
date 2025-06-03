class TreeNode {
    constructor(user) {
        this.user = user;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(user) {
        const newNode = new TreeNode(user);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(node, newNode) {
        if (newNode.user.id < node.user.id) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    remove(id) {
        this.root = this._removeNode(this.root, id); // corrigido: era this.node
    }

    _removeNode(node, id) {
        if (node === null) return null;

        if (id < node.user.id) {
            node.left = this._removeNode(node.left, id); // corrigido: faltava o segundo argumento
            return node;
        } else if (id > node.user.id) {
            node.right = this._removeNode(node.right, id);
            return node;
        } else {
            // Caso 1: sem filhos
            if (node.left === null && node.right === null) {
                return null;
            }

            // Caso 2: um filho
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Caso 3: dois filhos
            const minNode = this._findMin(node.right);
            node.user = minNode.user;
            node.right = this._removeNode(node.right, minNode.user.id);
            return node;
        }
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}
module.exports = BinarySearchTree;
